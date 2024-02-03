export default function ({ $auth, redirect }) {
  // check if logged in true
  if($auth.loggedIn) {
    // then, check for admin role
    if($auth.strategy.name === "admin") {
      return redirect('/admin/dashboard');
    }

    // and, check for customer role
    if($auth.strategy.name === "customer") {
      return redirect('/customer/dashboard');
    }
  }
}
