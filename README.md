If you're reading this, hello!

For some background, I just wanted to know approximate population density in the U.S. of people
who used the social media mobile app BARQ!. My methods are listed and simplified below:

1. Gather a list of all U.S. cities with a population of 100k+ as of 2023 and place them into a CSV.
2. Run the BARQ! GraphQL API in each city 10 times to gather the closest 1k users in each city.
3. Filter duplicates for cities which are close together.
    - For example, the closest 1000 users in Fort Worth, TX and closest 1000 users to Dallas, TX
    will have some obvious overlap. The user belongs to whichever city they're closer to.
4. Output the results into a heat map on this small Angular application.

I decided to keep the data here under /assets since I don't see the harm.

Feel free to run this to check out the results. :3c