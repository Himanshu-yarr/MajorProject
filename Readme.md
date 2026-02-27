# Steps Used in Creating This Project

## Basic Setup

1. Created a `package.json` file.
2. Installed required packages:
   - `express`
   - `ejs`
   - `mongoose`
3. Created `app.js`:
   - Imported `express` and `mongoose`.
   - Started `mongosh` in the terminal.
   - Created a server port.
   - Established a connection to the MongoDB database.

## Listing Models

4. Created a `models` folder to store all database models.
5. Inside the `models` folder, created `listing.js`:
   - Defined the first schema.
   - Exported the schema for use in other parts of the project.

## Initialize Database

6. Created an `init` folder for database initialization scripts or setup files.
7. Added a `data.js` file to store sample data. Created `index.js` in the `init` folder and imported:
   - `mongoose` for database connection
   - `data.js` for sample data
   - `listing.js` for the Listing model  
     Then connected to MongoDB in `index.js`.
8. Created an asynchronous function `initDB` to:
   - Delete previously stored data in the database.
   - Insert all sample data from `data.js` into the database.
9. Called the `initDB()` function to initialize the database.

## Index Route

10. Created an index route (`/listing`) in `app.js`:
    - Used Mongoose to fetch all listings from the database.
    - Passed the retrieved data to an EJS template for rendering.

11. Set up the `views` folder structure:
    - Created a `views` folder in the project.
    - Inside it, created a `listings` folder to store all listing-related EJS files.
    - Required the `path` module in `app.js` to configure the views folder path.

12. Created an `index.ejs` file inside `views/listings`:
    - Displayed a heading "All Listings".
    - Used a loop to render all listings dynamically from the database.
    - Each listing title is displayed as a clickable link to its individual detail page.

13. Verified that the index route works correctly and successfully renders all listings with EJS templates.

## READ (Show Route)

14. Created a route (`/listing/:id`) in `app.js`:
    - Used `req.params` to extract the `id` from the URL.
    - Queried the database using `Listing.findById(id)` to fetch a single listing.
    - Rendered the result using an EJS template called `show.ejs`.

15. Created a `show.ejs` file inside `views/listings`:
    - Displayed a heading "Full Details".
    - Rendered listing details such as:
      - Title
      - Description
      - Price (formatted in Indian Rupees using `toLocaleString("en-IN")`)
      - Location

16. Note: `toLocaleString("en-IN")` is used to format numbers according to the Indian numbering system (e.g., ₹10,00,000 instead of 1,000,000).

## New and Create Route

17. Added a "Create New Listing" button in `index.ejs` that redirects the user to a form for creating a new listing.

18. Created a new route (`/listing/new`) in `app.js` to render the `new.ejs` form.

19. Created a `new.ejs` file inside the `views/listings` folder that contains a form for entering details like title, description, image, price, country, and location.

20. Enabled form data parsing in `app.js` using `express.urlencoded({ extended: true })` to handle POST request data from forms.

21. Created a POST route (`/listing`) in `app.js` to:

- Extract data submitted through the form.
- Create a new `Listing` object using the form data.
- Save the new listing to the MongoDB database.
- Redirect the user back to the `/listing` page to display all listings.

## Edit, Update, and Delete Routes

22. Installed and configured `method-override` in `app.js` to allow HTML forms to send PUT and DELETE requests.

23. Created an Edit route (`/listing/:id/edit`) in `app.js` to fetch a listing by its ID and render an `edit.ejs` form pre-filled with the existing listing details.

24. Created an `edit.ejs` file inside the `views/listings` folder that contains a form with input fields for title, description, image, price, country, and location, all pre-filled with the listing’s current data.

25. Created an Update route (`/listing/:id`) in `app.js` using the PUT method to:

- Extract the listing ID from the URL.
- Update the listing in the database with the new form data.
- Redirect the user back to the show page of the updated listing.

26. Added an "Edit this listing" link in `show.ejs` that redirects users to the edit form for the selected listing.

27. Added a Delete form in `show.ejs` with a button to remove a listing. The form uses the DELETE method with method-override.

28. Created a Delete route (`/listing/:id`) in `app.js` using the DELETE method to:

- Extract the listing ID from the URL.
- Delete the corresponding listing from the MongoDB database.
- Redirect the user back to the `/listing` page to display the remaining listings.

## Summary of CRUD Operations

In this project, the full set of CRUD operations has been implemented:

- **Create**:  
  Users can create a new listing using the form available at `/listing/new`. The data is submitted and stored in MongoDB.

- **Read**:
  - All listings are displayed on the index page (`/listing`).
  - Individual listing details can be viewed on the show page (`/listing/:id`).

- **Update**:  
  Users can edit an existing listing through the edit form (`/listing/:id/edit`). The updated details are saved in MongoDB using the PUT method.

- **Delete**:  
  Users can delete a listing using the delete button available on the show page. The listing is removed from MongoDB using the DELETE method.

This completes the full CRUD cycle (Create, Read, Update, Delete) for managing listings in the application.

# Creating the Boilerplate Layout (Wanderlust Project)

1. Created a `boilerplate.ejs` file inside the `layouts` folder to serve as the main layout structure for all pages.
   - Added standard HTML structure including `<head>` and `<body>`.
   - Linked Bootstrap and Font Awesome CDNs for styling and icons.
   - Linked the custom stylesheet using `<link rel="stylesheet" href="/css/style.css">`.
   - Included navbar and footer using EJS includes.
   - Wrapped the main content inside `<div class="container"><%- body %></div>`.

2. Updated all EJS view files like `index.ejs`, `show.ejs`, `new.ejs`, etc.
   - Added `<% layout("/layouts/boilerplate") %>` at the top of each file.
   - Removed old `<html>`, `<head>`, and `<body>` tags.
   - Kept only unique content like listings, forms, and buttons.
   - This ensures all pages share the same consistent layout.

3. Created a responsive navbar using Bootstrap.
   - Copied the navbar from Bootstrap’s official documentation.
   - Customized it to include links like Home, Listings, and Create.
   - Saved it as `navbar.ejs` to include on all pages.

4. Set up the public folder for static assets.
   - Created a `public` folder in the project’s root directory.
   - Inside it, created a `css` folder and added a `style.css` file.
   - Used `style.css` to store all custom styling for the project.

5. Enabled static file serving in Express.
   - Imported the `path` module in `app.js`.
   - Added `app.use(express.static(path.join(__dirname, "/public")));` to make CSS and other static files available throughout the project.

6. Created an `includes` folder inside the `views` directory for reusable components.
   - Created `navbar.ejs` and `footer.ejs` inside it.
   - In `navbar.ejs`, pasted the Bootstrap navbar structure and customized it.
   - In `footer.ejs`, added a simple footer like “© 2025 Wanderlust | All Rights Reserved.”

7. Included the navbar and footer in the main layout.
   - In `boilerplate.ejs`, added:
     `<%- include("../includes/navbar.ejs") %>`  
     `<div class="container"><%- body %></div>`  
     `<%- include("../includes/footer.ejs") %>`
   - This makes the navbar appear at the top and the footer at the bottom of every page.

8. Added CSS styling in `style.css`.
   - Styled the navbar, headings, forms, buttons, and page layout.
   - The styles now automatically apply to all EJS files through the shared layout.

9. Final result:
   - All pages now share a single, consistent layout.
   - Navbar and footer appear automatically.
   - Global styling is managed through one CSS file.
   - Any new EJS file can use the layout by adding `<% layout("/layouts/boilerplate") %>`.

## Displaying Listings Using Bootstrap Cards in index.ejs

1. **Removed the Previous Listing Format**
   - Deleted the earlier listing structure that used the `<ul>` and `<li>` tags to display listings.

2. **Implemented Bootstrap Cards for a Modern Layout**
   - Added a `<div class="row">` container in `index.ejs` to arrange cards in responsive rows.

3. **Used a For Loop to Render Listings Dynamically**
   - Inside the row, used an EJS `for` loop to iterate through `allListings`.
   - For each listing:
     - Displayed the listing image using `listing.image.url`.
     - Added the title (`listing.title`).
     - Displayed the price in Indian currency using `listing.price.toLocaleString("en-IN")`.
     - Included a Bootstrap “Go somewhere” button (can later be linked to the individual listing page).

4. **Styled Each Card**
   - Used the Bootstrap class `card` and set a fixed width of `20rem` for consistency.
   - Wrapped the content in `<div class="card-body">` for proper padding and structure.

5. **Result**
   - All listings now appear in clean, uniform Bootstrap cards.
   - Cards automatically adjust and align in rows, creating a visually appealing, responsive layout.

## Improving the Create New Listing Page (new.ejs)

1. **Linked the Page with the Common Layout**
   - Added the EJS layout directive at the top: `<% layout("/layouts/boilerplate") %>`
   - Ensures the page inherits the common header, footer, and Bootstrap styling from `boilerplate.ejs`.

2. **Used Bootstrap Grid System for Proper Alignment**
   - Wrapped the form inside a centered Bootstrap column using:
     - `<div class="row">`
     - `<div class="col-8 offset-2">`
   - This keeps the form centered on all screen sizes.

3. **Replaced Plain Form Inputs with Bootstrap Components**
   - Used Bootstrap’s `form-control`, `form-label`, and `mb-3` classes for each input and label.
   - This makes the form visually cleaner and better spaced.

4. **Grouped Related Fields for Better Layout**
   - Organized the **Price** and **Country** inputs in the same row using Bootstrap columns (`col-4` and `col-8`).
   - Makes the form compact and neatly structured.

5. **Added Clear Placeholders for Better User Guidance**
   - Added meaningful placeholder text for each field like:
     - _Add a catchy title_
     - _Enter description_
     - _Enter image URL/link_
     - _1200_ for price
     - _India_ for country
     - _Pithoragarh, Uttarakhand_ for location

6. **Improved Submit Button Styling**
   - Replaced the default button with a Bootstrap dark button using:  
     `<button class="btn btn-dark add-btn">Add</button>`
   - Adds a professional and consistent look.

7. **Final Result**
   - The **Create New Listing** page is now:
     - Fully responsive and centered.
     - Styled using Bootstrap form classes.
     - Cleaner, more user-friendly, and consistent with the project theme.

## Enhancing the Edit Listing Page (`edit.ejs`)

1. **Applied the Base Layout**
   - Added `<% layout("/layouts/boilerplate") %>` at the top to use the common layout structure across pages.

2. **Created a Centered and Responsive Form Layout**
   - Wrapped the entire form inside a `<div class="row mt-3">` and `<div class="col-8 offset-2">` for proper alignment and spacing using Bootstrap’s grid system.

3. **Added Page Title**
   - Included an `<h3>` heading labeled **“Edit Your Listing”** for better page context.

4. **Configured the Form for Updating Listings**
   - Set form method to `POST` and used `action="/listing/<%= listing._id %>?_method=PUT"` to enable the PUT request via **method-override**.
   - Ensured compatibility with Express’s RESTful routes for the **Update (Edit)** operation.

5. **Added Form Fields with Pre-Filled Data**
   - **Title Field**:  
     `<input name="listing[title]" value="<%= listing.title %>" type="text" class="form-control">`
   - **Description Field**:  
     `<textarea name="listing[description]" class="form-control"><%= listing.description %></textarea>`
   - **Image Link Field**:  
     `<input name="listing[image]" value="<%= listing.image %>" type="text" class="form-control">`
   - **Price & Country Fields** (arranged in a row):
     - Price input: `type="number"`, occupies `col-md-4`
     - Country input: `type="text"`, occupies `col-md-8`
   - **Location Field**:  
     `<input name="listing[location]" value="<%= listing.location %>" type="text" class="form-control">`

6. **Added a Styled Submit Button**
   - Used a dark Bootstrap button:  
     `<button class="btn btn-dark edit-btn mt-3">Edit</button>`

7. **Final Result**
   - The edit page now displays a clean, centered, and user-friendly form.
   - Each field is pre-filled with the existing listing data, making it easy to edit.
   - The layout aligns seamlessly with other pages due to the shared `boilerplate` layout.

## Displaying Individual Listing Details (`show.ejs`)

1. **Applied the Common Layout**
   - Added `<% layout("/layouts/boilerplate") %>` to maintain a consistent design across all pages.

2. **Structured the Page with Bootstrap Grid**
   - Wrapped all content inside a `<div class="row mt-3">` for spacing and structure.
   - Used column classes like `col-8 offset-3` and `col-6 offset-3` to center the content horizontally.

3. **Added a Page Heading**
   - Included an `<h3>` titled **“Listing Details”** to clearly indicate the purpose of the page.

4. **Implemented a Bootstrap Card to Display Listing Information**
   - Created a `<div class="card col-6 offset-3">` to show the listing in a clean, styled layout.
   - Inside the card:
     - Displayed the **listing image** using `<%= listing.image.url %>` with class `show-img`.
     - Added a `<div class="card-body">` to hold listing details:
       - **Title**: Displayed in bold using `<%= listing.title %>`.
       - **Description**: `<%= listing.description %>`
       - **Price**: Shown in Indian currency using `listing.price.toLocaleString("en-IN")`.
       - **Location** and **Country**: Displayed below the price for better readability.

5. **Added Edit and Delete Functionality**
   - **Edit Button**:  
     Added a Bootstrap dark button linking to the edit page —  
     `<a href="/listing/<%= listing._id %>/edit" class="btn btn-dark col-1 offset-3 edit-btn">Edit</a>`
   - **Delete Button**:  
     Used a form to send a `DELETE` request via method override —  
     `<form action="/listing/<%= listing._id %>?_method=DELETE" method="POST">`

6. **Button Layout**
   - Wrapped both buttons in a `<div class="btns">` container for proper alignment and spacing.
   - Used `offset` classes to keep buttons visually centered.

7. **Final Result**
   - The `show.ejs` page now cleanly displays all details of a single listing inside a Bootstrap card.
   - The design is consistent, centered, and responsive.
   - Includes both **Edit** and **Delete** options for easy listing management.

## ✅ Client-Side Form Validation (Using Bootstrap)

1. **Purpose**
   - To improve the user experience by validating form inputs on the client side before submission.
   - Ensures users are guided with clear success and error feedback messages.
   - Prevents incomplete or invalid data from being sent to the server.

---

2. **Disabled Default Browser Validation**
   - Added the `novalidate` attribute inside both `new.ejs` and `edit.ejs` forms.
   - This disables the browser’s default validation UI, allowing us to fully use Bootstrap’s custom validation design.

   > **Example:**  
   > `<form action="/listing" method="post" novalidate class="needs-validation">`

---

3. **Added Bootstrap’s Validation Class**
   - Applied the `class="needs-validation"` to each form.
   - This class enables Bootstrap’s built-in validation styling and behavior.

   > **Definition:**  
   > The `needs-validation` class signals that this form should be styled according to Bootstrap’s validation state.

---

4. **Used the `required` Attribute for Validation**
   - Added `required` to necessary input fields like **title**, **description**, **price**, **country**, and **location**.
   - The browser checks these fields before form submission and triggers Bootstrap’s validation feedback if left empty.

   > **Definition:**  
   > The `required` attribute makes a field mandatory; if it’s empty, the form won’t submit.

---

5. **Added Validation Feedback Messages**
   - Used Bootstrap’s feedback components inside each form field:
     - `.valid-feedback` → for success messages when input is correct.
     - `.invalid-feedback` → for error messages when input is missing or invalid.

   > **Example:**
   >
   > ```html
   > <div class="valid-feedback">Title looks good!</div>
   > <div class="invalid-feedback">Please enter a title</div>
   > ```

---

6. **Improved User Guidance**
   - Added placeholder text for better clarity (e.g., “Add a catchy title”, “Enter image URL/link”, “Pithoragarh, Uttarakhand”).
   - Helps users understand what kind of data is expected in each field.

---

7. **Applied Validation to `edit.ejs`**
   - The same validation logic and feedback messages were implemented in `edit.ejs`.
   - This ensures consistent validation across both creating and editing listings.

---

8. **Result**
   - Both **New Listing** and **Edit Listing** forms now include smooth, user-friendly validation.
   - Users see **real-time success or error messages** while filling the form.
   - Validation ensures data accuracy before it even reaches the server.

---

🧩 **In Short:**
| Feature | Property/Attribute Used | Purpose |
|----------|-------------------------|----------|
| Disable default validation | `novalidate` | Turns off browser’s default validation UI |
| Enable Bootstrap validation | `needs-validation` | Activates Bootstrap validation styling |
| Mandatory fields | `required` | Prevents form submission if empty |
| Feedback messages | `.valid-feedback` / `.invalid-feedback` | Provides success/error hints to the user |

## ⚠️ Custom Error Handling Setup

1. **Created Utility Folder and Files**
   - Added a new folder named `utils/` inside the project root.
   - Inside it, created two helper files: `ExpressError.js` and `wrapAsync.js`.

2. **Defined a Custom Error Class**
   - `ExpressError.js` was created to define a reusable error class that holds both a **status code** and a **message**.
   - This allows sending structured error responses instead of plain messages.
   - Example: used to throw errors like `new ExpressError(404, "Page not found")`.

3. **Added Async Wrapper for Routes**
   - `wrapAsync.js` was created to handle async route errors automatically.
   - It eliminates the need for multiple `try-catch` blocks in route handlers.
   - The function wraps an async route and forwards any error to the centralized error middleware using `next()`.

4. **Imported Utilities in `app.js`**
   - Imported both `wrapAsync` and `ExpressError` at the top of `app.js` for global access.
   - This allows wrapping async routes and throwing structured errors across the app.

5. **Wrapped All Async Routes**
   - Every async route (like `GET /listing`, `POST /listing`, etc.) was wrapped inside `wrapAsync()` for safer error handling.
   - This ensures that any error in database queries or rendering is automatically caught and passed to the error middleware.

6. **Defined a Catch-All Route for Undefined Paths**
   - Added middleware at the end of `app.js` that throws a `404` error using `ExpressError` whenever a route is not matched.
   - Helps in displaying a proper “Page not found” message instead of a blank or crashed page.

7. **Implemented Centralized Error Middleware**
   - Created an error-handling middleware at the bottom of `app.js`.
   - It extracts `statusCode` and `message` from the error and renders an `error.ejs` page.
   - If no custom error is provided, it defaults to a `500` status with a generic message.

8. **Created `error.ejs` Template**
   - Added an `error.ejs` file inside the `views/` folder.
   - The template displays the error message inside a **Bootstrap alert box** for a clean UI.
   - Used `<% layout("/layouts/boilerplate") %>` to maintain consistent styling with other pages.

9. **Result**
   - All async route errors and invalid URLs are now handled gracefully.
   - The user sees a clear and styled message instead of raw server errors.
   - Makes the app more stable and user-friendly.

## ✅ Server-Side Validation Using Joi — Instructions & Functioning

### 1. **Install Joi**

- Install Joi package to perform **backend data validation**.
- It checks form data before it’s saved to the database.

---

### 2. **Create a Schema File**

- Make a new file named `schema.js`.
- Define validation rules for all listing fields (like title, price, location, etc.).
- The schema ensures every listing has valid and complete data before being processed.

---

### 3. **Import Schema in app.js**

- Import the Joi schema from `schema.js` into your main app file.
- This allows you to use the validation rules in different routes.

---

### 4. **Create Validation Middleware**

- Create a middleware function named `validateListing`.
- It validates the incoming data (`req.body`) using the Joi schema.
- If validation fails → throws a custom error with details.
- If validation passes → it moves to the next middleware or route handler.

---

### 5. **Use Middleware in Routes**

- Add `validateListing` before the main controller logic in **create** and **update** routes.
- This ensures that all form submissions go through validation automatically.

---

### 6. **Remove Old Manual Checks**

- The old `if (!req.body.listing)` checks are no longer needed.
- Joi now handles all data validation and throws meaningful errors automatically.

---

### ⚙️ **Functioning Summary**

1. User submits form data.
2. `validateListing` middleware runs before the main route logic.
3. Joi checks whether all required fields are valid and non-empty.
4. If invalid → an error message is generated and sent.
5. If valid → request proceeds, and data is saved to the database.

---

### 🎯 **Result**

- Prevents missing or invalid form fields.
- Protects the database from invalid entries.
- Ensures cleaner, more secure, and reliable backend validation.
