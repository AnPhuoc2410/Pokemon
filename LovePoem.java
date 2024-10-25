public class LovePoem {
    public static void main(String[] args) {
        String[] loveLines = {
            "You are my heart ❤",
            "In every line of my code,",
            "My love for you grows.",
            "Our love, forever encrypted,",
            "In the language only we know."
        };

        for (String line : loveLines) {
            log(line);
        }

        boolean love = askLoveStatus();
        if (love) {
            log("Together forever! 💞");
        } else {
            log("In another life... 💔");
        }
    }

    private static boolean askLoveStatus() {
        java.util.Scanner scanner = new java.util.Scanner(System.in);
        System.out.print("Do you love me? (Y/N): ");
        String response = scanner.nextLine().trim().toUpperCase();
        scanner.close();
        return response.equals("Y");
    }

    private static void log(String message) {
        System.out.println(message);
    }
}
