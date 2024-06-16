'use client'

import { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from '@/components/ui/use-toast'

const MeetingTypeList = () => {
  const router = useRouter()

  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >()
  const { user } = useUser()
  const client = useStreamVideoClient()
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: '',
  })
  const [callDetails, setCallDetails] = useState<Call>()
  const { toast } = useToast()
  const createMeeting = async () => {
    if (!client || !user) return
    try {
      if (!values.dateTime) {
        toast({
          title: 'Please selec a date and time',
        })
        return
      }
      const id = crypto.randomUUID()
      const call = client.call('default', id)
      if (!call) throw new Error('Failed to create call')
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString()
      const description = values.description || 'Instant Meeting'
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: { description },
        },
      })
      setCallDetails(call)
      if (!values.description) {
        router.push(`/meeting/${call.id}`)
      }
      toast({
        title: 'Meeting Created',
      })
    } catch (error) {
      console.log(Error)
      toast({
        title: 'Failed To Create Meeting',
      })
    }
  }

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
