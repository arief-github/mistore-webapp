export default function ({ $auth, redirect }) {
    // check logged in false
  if(!$auth.loggedIn) {
    return redirect('/customer/login')
  }

  // check customer role
  if($auth.strategy.name !== "customer") {
    return redirect('/customer/login')
  } else {
    return
  }
}
