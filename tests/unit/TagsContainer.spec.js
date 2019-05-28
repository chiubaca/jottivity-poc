import { shallowMount } from '@vue/test-utils'
import Tags from '@/components/TagsContainer'

describe('Tags.vue', () => {

  const wrapper = shallowMount(Tags, {
      propsData: {
        "tags":{
          "mood":
                  [
                    {"colour":"blue","description":"Happy","tag":"mood"},
                    {"colour":"blue","description":"Content","tag":"mood"},
                    {"colour":"blue","description":"Satisfied","tag":"mood"},
                  ],
          "productivity":
                  [
                    {"colour":"blue","description":"Life","tag":"productivity"},
                    {"colour":"blue","description":"Family","tag":"productivity"},
                    {"colour":"blue","description":"Work","tag":"productivity"}
                  ]
                }
      },
      computed:{
        tagsObject(){
          return true
        }
      }
  })

  wrapper.vm.$emit('checked-tags')

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should have 6 checkboxes given the props data has 6 tags in total', () => {
    const checkboxInputs = wrapper.findAll('.tags')
    for(let i = 0 ; i < 6 ; i++ ){
      expect(checkboxInputs.at(i)).toBeTruthy()
    }

  })

  it('should not have any tags selected by default', () => {
    expect(wrapper.vm.checkedTags).toEqual([])
  })


  it('should add tag to checkedTags when input is checked', () => {
    const checkboxInput = wrapper.find('input[type="checkbox"]')
    checkboxInput.setChecked()
    expect(wrapper.vm.checkedTags).toEqual([{"colour": "blue", "description": "Happy", "tag": "mood"}])
  })

})




