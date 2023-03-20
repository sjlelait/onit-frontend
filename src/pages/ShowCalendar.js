import Calendar from 'react-calendar'
import { useEffect, useState } from 'react';

const CalendarPage = (props) => {
    const greeting = 'How are you feeling today?'
    const emotionData
     = [
        {
            name:"happy",
            emoji:"😁",
            id: 0,
        
        }, 
        {
            name:"sad",
            emoji: "😕",
            id: 1,
        }, 
        {
            name:"depressed",
            emoji:"😔",
            id: 2,
        }, 
        {
            name:"silly",
            emoji:"😜",
            id: 3,
        },
    ]

    const [selectedEmotion, setSelectedEmotion] = useState(null);

    useEffect(() => {
        const storedEmotion = localStorage.getItem('selectedEmotion');
        if(storedEmotion){
            setSelectedEmotion(storedEmotion);
        }
    }, []);

    const handleEmotionClick = (emotion) => {
        setSelectedEmotion(emotion.emoji);
        localStorage.setItem('selectedEmotion', emotion.emoji);
    };

      const tileContent = ({ date, view }) => {
        if (view === 'month' && date.getDate() === new Date().getDate()) {
          return selectedEmotion ? `  ${selectedEmotion}` : '';
        }
      }
    const emotions = emotionData.map((emotion) => (
        <button key={emotion.name} onClick={() => handleEmotionClick(emotion)} className="btn btn-outline-light btn-lg">
          {emotion.emoji}
        </button>
      ));

    return (
        <div className='calendar-page'>
        {greeting}
        <br />
        <section className='emotion-btns'>{emotions}</section>
        
            <Calendar
                tileContent={tileContent}
            />
        
        </div>
    )
}


export default CalendarPage