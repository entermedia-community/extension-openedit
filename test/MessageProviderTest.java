import static org.junit.Assert.*;
import org.junit.Test;

public class MessageProviderTest {
    @Test
    public void testTodayMessage() {
        MessageProvider provider = new TodayMessageProvider();
        assertNotNull("Message should not be null", provider.getMessage());
    }
    
    @Test
    public void testTomorrowMessage() {
        MessageProvider provider = new TomorrowMessageProvider();
        assertNotNull("Message should not be null", provider.getMessage());
    }
}