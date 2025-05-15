export default function MainPage(props : any) {

    return (
        <div className='flex flex-row h-screen'>
            <div className='flex-1 bg-[#F5F5F5] h-screen'>
                <p className='text-black text-xl font-bold p-4'>{props.text}</p>
            </div>
            
        </div>
    )
}