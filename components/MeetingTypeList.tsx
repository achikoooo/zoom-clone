'use client'

import { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'

const MeetingTypeList = () => {
  const router = useRouter()

  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >()
  const createMeeting = () => {}

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      <HomeCard
        className='bg-orange-1'
        title='New Meeting'
        desc='Start an instant meeting'
        iconUrl='/icons/add-meeting.svg'
        handleClick={() => {
          setMeetingState('isInstantMeeting')
        }}
      />
      <HomeCard
        className='bg-blue-1'
        title='schedule Meeting'
        desc='Plan your meeting'
        handleClick={() => {
          setMeetingState('isScheduleMeeting')
        }}
        iconUrl='/icons/schedule.svg'
      />
      <HomeCard
        className='bg-purple-300'
        title='View Recordings'
        desc='Check out your recordings'
        handleClick={() => {
          setMeetingState('isJoiningMeeting')
        }}
        iconUrl='/icons/recordings.svg'
      />
      <HomeCard
        className='bg-yellow-400'
        title='Join Meeting'
        desc='Via inviation link'
        handleClick={() => {
          setMeetingState('isJoiningMeeting')
        }}
        iconUrl='/icons/join-meeting.svg'
      />
      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title='Start an Instant Meeting'
        className='text-center'
        buttonText='Start Meeting'
        handleClick={createMeeting}
      />
    </section>
  )
}

export default MeetingTypeList
