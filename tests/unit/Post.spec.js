import { shallowMount } from '@vue/test-utils'
import Post from '@/components/Post'

describe('Post.vue', () => {

  const wrapper = shallowMount(Post, {
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
        }
      }
  })

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('contains a ".post" class', () => {
    expect(wrapper.contains('.post')).toBe(true)
  })

  it('should not show post content by default', () => {
    expect(wrapper.vm.showPostContent).toBe(false)
  })

  it('show the post content when the header is clicked', () => {
    wrapper.find('h1').trigger('click')
    expect(wrapper.vm.showPostContent).toBe(true)
  })
})




