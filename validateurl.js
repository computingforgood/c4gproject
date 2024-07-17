function checkURLSafety() {
  var urlInput = document.getElementById('urlInput').value.trim();
  var resultParagraph = document.getElementById('result');

  // Check if URL starts with HTTP or HTTPS
  if (urlInput.toLowerCase().startsWith('https://')) {
    resultParagraph.textContent = 'URL uses HTTPS, indicating a secure connection.';
  } else if (urlInput.toLowerCase().startsWith('http://')) {
    resultParagraph.textContent = 'URL uses HTTP, which is less secure.';
  } else {
    resultParagraph.textContent = 'Please enter a valid URL starting with either HTTP or HTTPS.';
    return; // Exit function if URL doesn't start with HTTP or HTTPS
  }

  // Additional safety checks
  var domain = extractDomain(urlInput);
  var isSecureDomain = checkSecureDomain(domain);
  var hasSecurePath = checkSecurePath(urlInput);
  var hasValidFormat = isValidURLFormat(urlInput);

  if (!isSecureDomain) {
    resultParagraph.textContent += ' Domain might not be secure.';
  }

  if (!hasSecurePath) {
    resultParagraph.textContent += ' Path may not be secure.';
  }

  if (!hasValidFormat) {
    resultParagraph.textContent += ' URL format is not valid.';
  }
  // Check if URL is reachable
  fetch(urlInput)
    .then(response => {
      if (response.ok) {
        resultParagraph.textContent += ' URL is reachable.';
      } else {
        resultParagraph.textContent += ' URL is not reachable (server returned ' + response.status + ').';
      }
    })
    .catch(error => {
      resultParagraph.textContent += ' Error checking URL reachability: ' + error.message;
    });
}

// Helper function to extract domain from URL
function extractDomain(url) {
  var domain;
  // Find & remove protocol (http, ftp, etc.) and get domain
  if (url.indexOf("://") > -1) {
    domain = url.split('/')[2];
  } else {
    domain = url.split('/')[0];
  }
  // Remove port number
  domain = domain.split(':')[0];
  return domain;
}

// Check if domain is considered secure
function checkSecureDomain(domain) {
  // Example: You can implement specific checks based on known secure domains or blacklists
  // For demonstration purposes, let's assume 'example.com' is secure
  return domain.endsWith('.com') || domain.endsWith('.org') || domain.endsWith('.net');
}

// Check if URL path is secure
function checkSecurePath(url) {
  // Example: Check if URL contains known secure paths (e.g., '/secure/')
  return url.includes('/secure/');
}

// Validate URL format using a regular expression
function isValidURLFormat(url) {
  var urlPattern = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i;
  return urlPattern.test(url);
}
