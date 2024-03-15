import java.time.DayOfWeek;
import java.time.LocalDate;

public class TomorrowMessageProvider implements MessageProvider {
    @Override
    public String getMessage() {
        LocalDate tomorrow = LocalDate.now().plusDays(1);
        DayOfWeek dayOfWeek = tomorrow.getDayOfWeek();
        String dayString = dayOfWeek.toString().charAt(0) + dayOfWeek.toString().substring(1).toLowerCase();
        return "Happy " + dayString + ", Hello, Sweet World Tomorrow!";
    }
}