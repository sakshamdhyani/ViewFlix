import Loader from "/loader.gif"

const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center bg-black">
        <img src={Loader} alt="" className="wh[50%] object-cover" />
    </div>
  )
}

export default Loading