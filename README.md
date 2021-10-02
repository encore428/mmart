## Fundamentals in Frontend Development

## END OF MODULE PROJECT (CAPSTONE PROJECT)

<table>
    <thead> <tr><th>Project Title / Description</th>    <th>Implement a React SPA</th></tr> </thead>
    <tbody>
        <tr>
            <td>Project Objective(s)</td>
            <td>
                <p>Create a React single-page application (SPA) that has at least a listing page and a details page 
				   showing data from API.</p>
                <p>The application should allow users to bookmark items (like a favourite button) and show the 
				   bookmarked items in the home page. The bookmark data can be saved in localStorage.</p>
                <p>While creating the application, you should develop the style guide for your application using 
				   React Styleguidist.</p>
                <p>You’re free to use any styling technology (plain CSS, TailwindCSS, Bootstrap) etc, but your 
				   application must be styled.</p>
                <p>You’re NOT allowed to use third-party component libraries (like Material UI or React Bootstrap)
				   but you’re free to refer to them for inspiration.</p>
            </td>
        </tr>
        <tr>
            <td>Project Duration</td>
            <td>121 hours</td>
        </tr>
    </tbody>
</table>


Create a new Single Page Application using Create React App with the following pages:

1. Home page at path `/`, displays pages of personal artwork collection.  Artwork can be individually discarded.

2. Specify filtering criteria on Specifications page at path `/spec`.  The specification is used to compose API to 
   retrieve artwork from [Metropolitan Museum of Art](https://metmuseum.github.io/).

3. Browse filtered collection of artworks in pages at path `/browse`.  Artwork can be selectively added to personal collection.

4. View more details of selected artwork at path `/art/<objectID>`.


# Deployment

The app has been deployed to Netlify as below:

https://confident-thompson-470905.netlify.app/


During the deployment, there were two additional tasks required just because of Netlify:

1. CI=False, refer to [shoppingcart](https://github.com/encore428/shoppingcart).

1. Create file `_redirects` in `/public` folder (next to index.html), with this line `/* /index.html 200`.  Refer to 
this [article](https://ridbay.medium.com/react-routing-and-netlify-redirects-fd1f00eeee95).




