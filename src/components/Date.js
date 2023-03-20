var datetime = () => {
    let today = new Date().toLocaleDateString('en-us', { weekday:"long", month:"long", day:"numeric"});
    return(
        <div>
            {today}
        </div>
    )
}

export default datetime;