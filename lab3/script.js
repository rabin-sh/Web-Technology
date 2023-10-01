// Get references to HTML elements
const githubForm = document.getElementById('githubForm');
const usernameInput = document.getElementById('username');
const detailsDiv = document.getElementById('details');

// Add an event listener for the form submission
githubForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the entered username from the input field
    const username = usernameInput.value;

    if (username) {
        try {
            // Fetch user data from the GitHub API
            const response = await fetch(`https://api.github.com/users/${username}`);
            const userData = await response.json();

            if (response.ok) { // If the response is successful
                // Construct user details HTML
                const userDetails = `
                    <h2>${userData.name || username}</h2>
                    <p><strong>Login:</strong> ${userData.login}</p>
                    <p><strong>Location:</strong> ${userData.location || 'N/A'}</p>
                    <p><strong>Followers:</strong> ${userData.followers}</p>
                    <p><strong>Following:</strong> ${userData.following}</p>
                    <p><strong>Public Repositories:</strong> ${userData.public_repos}</p>
                    <p><strong>Avatar:</strong></p>
                    <img src="${userData.avatar_url}" alt="${userData.login}" width="100">
                `;
                detailsDiv.innerHTML = userDetails; // Display user details
            } else if (response.status === 404) { // If user not found
                detailsDiv.innerHTML = `<p>User '${username}' not found.</p>`;
            } else { // If there's another error
                const errorData = await response.json();
                detailsDiv.innerHTML = `<p>Error: ${errorData.message}</p>`;
            }
        } catch (error) { // If an error occurs during the fetch process
            detailsDiv.innerHTML = `<p>An error occurred while fetching data.</p>`;
        }
    }
});
