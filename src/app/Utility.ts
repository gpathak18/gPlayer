export default class Utility {
    
    static formatTime(time) {
        var minutes = Math.floor((time % 3600) / 60);
        var seconds = ('00' + Math.floor(time % 60)).slice(-2);
        return minutes + ':' + seconds;
    }

    static truncateString(string,maxLen){
        if (string.length > maxLen){
            return string.substring(0,maxLen)+'...';
        } else {
            return string;
        }        
     }
}