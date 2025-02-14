# List of Error Codes and Explanations

Here is a list of the error codes used in the code and their meanings:

1. **Code: 100**  
   - **Error:** `Error {statusCode} while downloading languages`  
   - **Meaning:** An error occurred while downloading the language list from the JSON file. This could be due to a poor network connection or an issue with the JSON file URL.  

2. **Code: 101**  
   - **Error:** `Error loading languages`  
   - **Meaning:** An error occurred while loading languages from the URL. This may be due to connectivity issues or an invalid server response.  

3. **Code: 102**  
   - **Error:** `Unsupported language: {lang}`  
   - **Meaning:** The requested language is not supported or is unavailable in the language JSON file. This may happen if the language is undefined or incorrect.  

4. **Code: 103**  
   - **Error:** `Error {statusCode} while downloading words`  
   - **Meaning:** An error occurred while downloading the word list for the specified language. This could be due to a poor network connection or an issue with the word list URL.  

5. **Code: 104**  
   - **Error:** `No words found with {length} letters in {lang}`  
   - **Meaning:** No words matching the specified length were found in the requested language. This may occur if the word list does not contain words of the desired length.  

6. **Code: 105**  
   - **Error:** `Error: {message}`  
   - **Meaning:** A general error occurred during execution. This code covers various errors related to network connection, data processing, or internal issues.