import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import PostModal from '@/components/PostModal'
import sinon from 'sinon'


Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    el.focus()
  }
})

describe('Post.vue', () => {

  let wrapper = null;
  let editPostStub = sinon.stub();

  beforeEach(() =>{
    wrapper = shallowMount(PostModal, {
      propsData: {
        postData:  {
          "contents":"contents",
          "date":"2019-05-06T00:00:00",
          "tags":{
            "mood":
                    [
                      {"colour":"blue","description":"Happy","tag":"mood"},
                      {"colour":"blue","description":"Content","tag":"mood"},
                      {"colour":"blue","description":"Satisfied","tag":"mood"},
                      {"colour":"blue","description":"Tired","tag":"mood"}
                    ],
            "productivity":
                    [
                      {"colour":"blue","description":"Life","tag":"productivity"},
                      {"colour":"blue","description":"Family","tag":"productivity"}
                    ]
                  },
          "title":"Smashed the Best Man Speech",
          "postID":"-LeDuZYSh6FO-bXRRgZQ"
        },

        modalState: true
      }
    });

  wrapper.setMethods({
      editPost : editPostStub
    });
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('contains a ".modal-container" class if modalState is true', () => {
    wrapper.setProps({ modalState: true })
    expect(wrapper.contains('.modal-container')).toBe(true)
  })

  it('doesnt contains a ".modal-container" class if modalState is false', () => {
    wrapper.setProps({ modalState: false })
    expect(wrapper.contains('.modal-container')).toBe(false)
  })

  it('triggers editPost when Update button is clicked', () => {
    const updateButton = wrapper.findAll('button').at(0)
    updateButton.trigger('click')
    expect(editPostStub.called).toBe(true)
  })

  it('triggers closeModal when Update button is clicked', () => {
    const closeModalButton = wrapper.findAll('button').at(1)
    closeModalButton.trigger('click')
    wrapper.setProps({ modalState: false })
    expect(wrapper.emitted('closeModal')).toBeTruthy()
  })

})




