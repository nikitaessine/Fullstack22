const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={type}>
        {console.log(message)}
        {message}
      </div>
    )
  }
  
  export default Notification