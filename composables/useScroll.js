export const useScroll = () => {
    // 디바운싱: 이벤트가 맨 마지막에만 발생하도록
    const debouncing = (table, scrollY) => {
        let timer;
        table.addEventListener("scroll", () => {
            if (timer) {   
                clearTimeout(timer); 
            }
            timer = setTimeout(() => {
                const scrollValue = Math.abs(table.scrollHeight - table.clientHeight - table.scrollTop);
                console.log(scrollValue);
                if (Math.abs(table.scrollHeight - table.clientHeight - table.scrollTop) < 1) {
                }          
            }, 300);
        })
    }
    
    // 쓰로틀링: 이벤트가 한번 발생하면 일정 시간 동안은 발생하지 않음!
    const throttling = (table, scrollY) => {
        let timer;
        table.addEventListener("scroll", () => {
            if (!timer) {
                timer = setTimeout(() => {
                    timer = null;
                    const scrollValue = Math.abs(table.scrollHeight - table.clientHeight - table.scrollTop);
                    console.log(scrollValue);
                    if (Math.abs(table.scrollHeight - table.clientHeight - table.scrollTop) < 1) {
                    }  
                }, 1000);
            }
        })
    }
    return {  
        debouncing, throttling
    }
}