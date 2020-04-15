import { shallowMount } from '@vue/test-utils'
import Crew from '@/components/Crew.vue'
import { Person } from '@/store/Person'

describe('Crew.vue', () => {
  it('renders props.data when passed', () => {
    const data: Person = {
      uuid: 'd00f2fef-75e3-44a2-bdde-87acf04e6331',
      firstName: 'Neil',
      lastName: 'Fitzpatrick',
      title: 'Mr.',
      position: {
        title: 'Pilot'
      },
      location: 0,
      status: 'OK',
      transferTime: 1
    }
    const wrapper = shallowMount(Crew, {
      propsData: { data }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
