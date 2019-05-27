import Vue from 'vue' 
import { shallowMount } from '@vue/test-utils'
import AddNewPost from '@/components/AddNewPost'
import 'firebase/auth'
import sinon from 'sinon'

Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    el.focus()
  }
})


describe('AddNewPost.vue', () => {

  let wrapper = null;
  let savePostStub = sinon.stub();

 

  beforeEach(() =>{
    wrapper = shallowMount(AddNewPost, {
      propsData: {
        tags:  {
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
        }
      }
    });

    wrapper.setMethods({
      postEntry : savePostStub
    });

  })


  afterEach(() => {
    wrapper.destroy()
  })

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should not show the new post modal by default', () => {
    expect(wrapper.vm.showNewPostModal).toBe(false)
  })

   it('shows modal when add-new-post-btn is clicked  ', () => {
    const newPostButton = wrapper.find('#add-new-post-btn')
    expect(newPostButton.attributes().id).toBe('add-new-post-btn')  
    newPostButton.trigger('click')
    expect(wrapper.vm.showNewPostModal).toBe(true)
  })

  it('triggers postEntry when save entry button is clicked', () => {
    wrapper.setData({ showNewPostModal: true })
    const saveButton = wrapper.findAll('button').at(0)
    saveButton.trigger('click')
    expect(savePostStub.called).toBe(true)
  })

  it('closes modal when exit button is clicked', () => {
    wrapper.setData({ showNewPostModal: true })
    const exitButton = wrapper.findAll('button').at(1)
    exitButton.trigger('click')
    expect(wrapper.vm.showNewPostModal).toBe(false)
  })

})




