export default {
  computed: {
    getDate() {
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1; //January is 0!
      let yyyy = today.getFullYear();
      let hour = today.getHours()
      let mins = today.getMinutes()

      //append an addition 0 if there is only a single digit
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      if (hour < 10) {
        hour = '0' + hour;
      }
      if (mins < 10) {
        mins = '0' + mins;
      }

      today = `${yyyy}-${mm}-${dd}T${hour}:${mins}:00`
      return today
    }
  }
}