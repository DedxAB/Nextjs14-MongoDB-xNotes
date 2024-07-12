import AllNotification from "@/components/Notification/AllNotification";
import WelcomeBanner from "@/components/WelcomeBanner/WelcomeBanner";

export default function page() {
  return (
    <>
      <section id="banner-notification">
        <WelcomeBanner
          title="Notifications"
          description="Here you will see all the notifications"
        />
      </section>

      <section id="all-notification">
        <AllNotification />
      </section>
    </>
  );
}
