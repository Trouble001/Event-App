import { HeartIcon, ChatBubbleOvalLeftIcon, PaperAirplaneIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

const EventCard = () => {
  return (
    <div className='w-full rounded border border-gray-200'>
        <div className='w-full flex flex-row items-center justify-start p-1.5 border-b border-gray-200'>
            <div className='w-6 h-6 p-4 tex-sm rounded-full flex items-center justify-center border border-gray-200'>JD</div>
            <h3 className='ml-1'>John Doe</h3>
        </div>
        <div className='p-4'>
            <p className='text-sm font-semibold text-gray-700'>आज मैं आपको एक कहानी सुनाता हूँ। ये कहानी धुरकोट के एक लड़के संदीप नाम की है। हाँ लड़का रोज बिना नहाये पढाई करने आता था पर पूछने पर वह बोलता था नहाने से कुछ नहीं होता।</p>
        </div>
        <div className='p-1.5 flex flex-row items-center justify-between border-t border-gray-200'>
            <HeartIcon className="w-5 h-5 text-gray-600" />
            <ChatBubbleOvalLeftIcon className="w-5 h-5 text-gray-600" />
            <PaperAirplaneIcon className="w-5 h-5 text-gray-600" />
            <ArrowDownTrayIcon className="w-5 h-5 text-gray-600" />
        </div>
    </div>
  )
}

export default EventCard;
