import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import About from '@/views/About.vue'

describe('About.vue', () => {
  const wrapper = mount(About)
    
  it('displays "this is an about page"', () => {    
    expect(wrapper.html()).toContain('<div class="about"><h1>This is an about page</h1></div>')
  })
})
