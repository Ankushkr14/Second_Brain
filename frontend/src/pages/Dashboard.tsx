import { PlusIcon } from '../components/icons/plusIcon'
import { ShareIcon } from '../components/icons/shareIcon'
import { Button } from '../components/UI/Buttton'
import { Card } from '../components/UI/Card'
import { CreateContentModel } from '../components/CreateContentModel'
import { useState } from 'react'
import { Sidebar } from '../components/UI/Sidebar'


function Dashboard() {

  const [modalOpen, setModelOpen] = useState(false);

  return (
    <div>
      <Sidebar/>
      <div className='p-4 ml-72 min-h-screen bg-gray-200 border-2'>
          <CreateContentModel open={modalOpen} onClose={()=>{
          setModelOpen(false);
          }}/>

        <div className='flex justify-end gap-4 pt-2'>
          <Button onClick={()=>setModelOpen(true)} variant='primary'  startIcon={<PlusIcon size='md'/>} size='md' text='Add Content'/>
          <Button variant='secondary'  startIcon = {<ShareIcon size = 'md'/>} size= 'md' text='Share Brain' onClick={()=>{}}/>
        </div>
        
        <div className = "flex gap-4 pt-6">
          <Card title='youtube video' link='https://x.com/caleb_friesen2/status/1936680431375818785' type='twitter'/>
          <Card title='New Card of youtube' link='https://www.youtube.com/watch?v=rE7xqjO5UMI&ab_channel=HarkiratSingh' type='youtube'/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
