import Image from "/notfound.gif"

const NotFound = () => {
  return (
    <div className="w-full h-full flex justify-center items-center bg-black">
        <img src={Image} alt="" className="wh[50%] object-cover" />
    </div>
  )
}

export default NotFound