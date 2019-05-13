import { shallowMount } from '@vue/test-utils'
import AddNewPost from '@/components/AddNewPost'
import firebase from 'firebase/app'
import 'firebase/auth'
import sinon from 'sinon'

describe('AddNewPost.vue', () => {

  let wrapper = null;

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
        },

      }
    });
  })

  // afterEach(() => {
  //   wrapper.destroy()
  // })

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })


  // it('triggers postEntry when save entry button is clicked', () => {
  // })

  // it('closes modal when exit button is clicked', () => {
  // })

  // it('', () => {
  // })


})




