export default function({ $auth, redirect }) {
  // check if logged in false
  if(!$auth.loggedIn) {
    return redirect('/admin/login')
  }

  // check for admin role
  if($auth.strategy.name !== "admin") {
    return redirect('/admin/login')
  } else {
    return
  }
}
