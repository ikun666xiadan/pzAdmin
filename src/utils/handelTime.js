import dayjs from "dayjs"

// 处理时间戳，转换时间格式
const handelTime = (time)=>{
    return dayjs(time).format('YYYY-MM-DD')
}

export default handelTime