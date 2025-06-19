const loadDarkThemeColors = () => {
    const style = getComputedStyle(document.documentElement)
    const darkTheme = {
        "color1": style.getPropertyValue("--color-1"),
        "color2": style.getPropertyValue("--color-2"),
        "color3": style.getPropertyValue("--color-3"),
        "color5": style.getPropertyValue("--color-5"),
        "color6": style.getPropertyValue("--color-6"),
    }
    return darkTheme
}

let darkTheme = true
const darkThemeColors = loadDarkThemeColors()
const lightThemeColors = {
    "color1": "#141D2F",
    "color2": "#F6F8FF",
    "color3": "#FFFFFF",
    "color5": "#4B6A9B",
    "color6": "#0079FF",
}

const switchTheme = () => {
    const style = document.documentElement.style
    const themeButtonText = document.getElementById("theme-button-text")
    const themeButtonIcon = document.getElementById("theme-button-icon")
    if (darkTheme) {
        style.setProperty("--color-1", lightThemeColors.color1)
        style.setProperty("--color-2", lightThemeColors.color2)
        style.setProperty("--color-3", lightThemeColors.color3)
        style.setProperty("--color-5", lightThemeColors.color5)
        style.setProperty("--color-6", lightThemeColors.color6)
        style.setProperty("--light-theme-shadow", "0px 18px 30px rgb(70, 96, 187, 19.86%)")
        themeButtonText.innerText = "DARK"
        themeButtonIcon.innerHTML = '<path d="M19.513 11.397a.701.701 0 00-.588.128 7.496 7.496 0 01-2.276 1.336 7.101 7.101 0 01-2.583.462 7.505 7.505 0 01-5.32-2.209 7.568 7.568 0 01-2.199-5.342c0-.873.154-1.72.41-2.49a6.904 6.904 0 011.227-2.21.657.657 0 00-.102-.924.701.701 0 00-.589-.128C5.32.61 3.427 1.92 2.072 3.666A10.158 10.158 0 000 9.83c0 2.8 1.125 5.342 2.967 7.19a10.025 10.025 0 007.16 2.98c2.353 0 4.527-.822 6.266-2.183a10.13 10.13 0 003.58-5.624.623.623 0 00-.46-.796z" fill-rule="nonzero"/>'
        darkTheme = false
    } else {
        style.setProperty("--color-1", darkThemeColors.color1)
        style.setProperty("--color-2", darkThemeColors.color2)
        style.setProperty("--color-3", darkThemeColors.color3)
        style.setProperty("--color-5", darkThemeColors.color5)
        style.setProperty("--color-6", darkThemeColors.color6)
        style.setProperty("--light-theme-shadow", "")
        themeButtonText.innerText = "LIGHT"
        themeButtonIcon.innerHTML = '<path d="M13.545 6.455c-.9-.9-2.17-1.481-3.545-1.481a4.934 4.934 0 00-3.545 1.481c-.9.9-1.481 2.17-1.481 3.545 0 1.376.582 2.646 1.481 3.545.9.9 2.17 1.481 3.545 1.481a4.934 4.934 0 003.545-1.481c.9-.9 1.481-2.17 1.481-3.545a4.934 4.934 0 00-1.481-3.545zM10 3.413a.7.7 0 00.688-.688V.688A.7.7 0 0010 0a.7.7 0 00-.688.688v2.037a.7.7 0 00.688.688zM15.635 5.344l1.455-1.455a.67.67 0 000-.952.67.67 0 00-.952 0l-1.455 1.455a.67.67 0 000 .952c.238.264.66.264.952 0zM19.312 9.312h-2.037a.7.7 0 00-.688.688.7.7 0 00.688.688h2.037A.7.7 0 0020 10a.7.7 0 00-.688-.688zM15.608 14.656a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455a.67.67 0 00.952 0 .67.67 0 000-.952l-1.455-1.455zM10 16.587a.7.7 0 00-.688.688v2.037A.7.7 0 0010 20a.7.7 0 00.688-.688v-2.037a.7.7 0 00-.688-.688zM4.365 14.656L2.91 16.111a.67.67 0 000 .952.67.67 0 00.952 0l1.455-1.455a.67.67 0 000-.952c-.238-.264-.66-.264-.952 0zM3.413 10a.7.7 0 00-.688-.688H.688A.7.7 0 000 10a.7.7 0 00.688.688h2.037A.7.7 0 003.413 10zM4.365 5.344a.67.67 0 00.952 0 .67.67 0 000-.952L3.862 2.937a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455z" fill-rule="nonzero"/>'
        darkTheme = true
    }
}

const userElements = {
    "fullname":     document.getElementById("user-fullname"),
    "username":     document.getElementById("user-username"),
    "bio":          document.getElementById("user-bio"),
    "joined":       document.getElementById("user-joined"),
    "repos":        document.getElementById("user-repos"),
    "followers":    document.getElementById("user-followers"),
    "following":    document.getElementById("user-following"),
    "location":     document.getElementById("user-location"),
    "twitter":      document.getElementById("user-twitter"),
    "website":      document.getElementById("user-website"),
    "company":      document.getElementById("user-company"),
    "avatar":       document.getElementById("user-avatar")
}

const formatDate = (rawDate) => {
    const date = new Date(rawDate)
    const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
    return formattedDate
}

const submitHandler = async (e) => {
    e.preventDefault()
    const inputUserName = document.getElementById("input-username")
    const username = inputUserName.value
    const error = document.getElementById("error-text")
    
    let url = `https://api.github.com/users/${username}`
    const response = await fetch(url)
    if (response.status === 404) {
        error.style.visibility = "visible"
        error.style.position = "relative"
        return
    }
    const json = await response.json()

    userElements.fullname.innerText = (!json.name) ? "---" : json.name
    userElements.username.innerText = (!json.login) ? "---" : `@${json.login}`
    userElements.bio.innerText = (!json.bio) ? "This profile has no bio" : json.bio
    userElements.joined.innerText = (!json.created_at) ? "---" : `Joined ${formatDate(json.created_at)}`
    userElements.repos.innerText = (!json.public_repos) ? "---" : json.public_repos
    userElements.followers.innerText = (!json.followers) ? "---" : json.followers
    userElements.following.innerText = (!json.following) ? "---" : json.following
    userElements.location.innerText = (!json.location) ? "---" : json.location
    userElements.twitter.innerText = (!json.twitter_username) ? "---" : json.twitter_username
    userElements.website.innerText = (!json.blog) ? "---" : json.blog
    userElements.website.href = (!json.blog) ? "---" : json.blog
    userElements.company.innerText = (!json.company) ? "---" : json.company
    userElements.avatar.src = (!json.avatar_url) ? "---" : json.avatar_url
    
    inputUserName.value = ""
    error.style.visibility = "hidden"
    error.style.position = "absolute"
}