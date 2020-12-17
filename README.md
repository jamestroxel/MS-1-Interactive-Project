# Rock Ranger
https://jamestroxel.github.io/MS-1-Interactive-Project/

## An Interactive map and visualization tool for exploring The Smithsonian Museum of Natural History's Mineral Sciences collection.

The Smithsonian Museum of Natural History's Mineral Sciences collection consists of hundreds of thousands of gems and minerals. The museum's digital archives provided geolocation points and other data for the 656 items found in the interactive map featured here. 

![Alt text](/Documentation/Home.png?raw=true)

The visualization at bottom left portions out the collection into a set of common colors, and allows you to explore the material accordingly. This involved creating a node script that analyzed the the text descriptions of each gem and sorting them by key words matched to 20 different color groups. With numerous ways of describing something that is "yellowish green", this helped to make the data more accessible while also giving the user a general idea of the over all shape, or in this case, "color" of the data.

![Alt text](/Documentation/ByColor.png?raw=true)

All items link directly to the collection record on the museum's website. This is especially helpful for the many items to which image rights applied. 

![Alt text](/Documentation/ByGeo.png?raw=true)

I learned over time that the structure of the Smithsonian's returned API data required a more adaptive approach to the data analysis than the rigid criteria I had begun with. For example, looking for the carat weight value in the same exact location of the data would often return "null" values. Generalizing the search queries, in addition to creating a placeholder graphic for items with rights-managed images allowed me to broaden my dataset as much as possible without encountering any "null" values or other missing pieces. This was especially important for the map, where the sparseness of the available data could quickly become an issue. 

