import java.time.DayOfWeek;
import java.time.LocalDate;

public class TodayMessageProvider implements MessageProvider {
    @Override
    public String getMessage() {
        DayOfWeek dayOfWeek = LocalDate.now().getDayOfWeek();
        String dayString = dayOfWeek.toString().charAt(0) + dayOfWeek.toString().substring(1).toLowerCase();
        return "Happy " + dayString + ", Hello, Sweet World!";
    }
}
