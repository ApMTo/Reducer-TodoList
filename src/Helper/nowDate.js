const nowDate = () => {
    const now = new Date();
    
    const getWeekday = (date) => date.toLocaleDateString('en-US', { weekday: 'long' });
    
    const getMonth = (date) => date.toLocaleDateString('en-US', { month: 'long' });
    
    const day = now.getDate();
    const month = getMonth(now);
    const year = now.getFullYear();
    
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    const formattedDate = `${getWeekday(now)}, ${month} ${day}, ${year} ${hours}:${minutes}`;
    
        return formattedDate;
    }
    
    
    export default nowDate;