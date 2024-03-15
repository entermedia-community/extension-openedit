public class HelloWorld {
    public static void main(String[] args) {
        MessageProvider todayProvider = new TodayMessageProvider();
        MessageProvider tomorrowProvider = new TomorrowMessageProvider();
        
        System.out.println(todayProvider.getMessage());
        System.out.println(tomorrowProvider.getMessage());
    }
}