document.addEventListener('DOMContentLoaded', function() {
    // Sample exhibitions data
    const exhibitions = [
        {
            id: 1,
            title: "Material Landscapes",
            date: "March 15 - April 30, 2001",
            location: "Modern Gallery, New York",
            description: "Material Landscapes investigates the physical properties and conceptual possibilities of diverse materials in contemporary art practice. This exhibition brings together works that push the boundaries of traditional media, incorporating unconventional substances and techniques to create new forms of artistic expression. From textural paintings to sculptural installations, the works in this exhibition highlight the artist's role as both innovator and researcher.",
            image: "../images/exhibits/ex1.jpg",
            featuredWorks: [
                "Sound Waves (2018)",
                "Echo Chamber (2021)",
                "Frequency Modulation (2022)",
                "Ambient Structures (2020)"
            ]
        },
        {
            id: 2,
            title: "Digital Memories",
            date: "September 5 - October 15, 2022",
            location: "Contemporary Art Center, Berlin",
            description: "Digital Memories examines how technology mediates our relationship with personal and collective memory. This exhibition presents a collection of works that employ digital media to reframe historical narratives and explore the fragility of remembrance in an age of information overload. Through interactive installations and digital collages, the exhibition questions how digital technologies both preserve and distort our understanding of the past.",
            image: "../images/exhibits/ex2.jpg",
            featuredWorks: [
                "Digital Collage Series (2019)",
                "Memory Cache (2021)",
                "Pixel Nostalgia (2020)",
                "Data Fragments (2022)"
            ]
        },
        {
            id: 3,
            title: "Material Explorations",
            date: "May 10 - June 28, 2021",
            location: "Riverside Arts Center, Chicago",
            description: "Material Explorations investigates the physical properties and conceptual possibilities of diverse materials in contemporary art practice. This exhibition brings together works that push the boundaries of traditional media, incorporating unconventional substances and techniques to create new forms of artistic expression. From textural paintings to sculptural installations, the works in this exhibition highlight the artist's role as both innovator and researcher.",
            image: "../images/exhibits/ex3.jpg",
            featuredWorks: [
                "Abstract Composition (2014)",
                "Textural Studies (2019)",
                "Composite Structures (2020)",
                "Material Dialectics (2021)"
            ]
        },
        {
            id: 4,
            title: "Urban Dialogues",
            date: "November 8 - December 20, 2020",
            location: "Metropolitan Museum, Paris",
            description: "Urban Dialogues presents a critical examination of contemporary urban environments through photography, installation, and mixed media works. This exhibition captures the complex dynamics of city life, from architectural transformations to social interactions. The featured works document urban spaces in transition, revealing the layered histories and conflicting narratives embedded within our built environments.",
            image: "../images/exhibits/ex4.jpg",
            featuredWorks: [
                "Urban Fragments (2017)",
                "City Palimpsest (2019)",
                "Concrete Abstractions (2020)",
                "Metropolitan Rhythms (2018)"
            ]
        },
        {
            id: 5,
            title: "Spatial Interventions",
            date: "February 12 - March 30, 2019",
            location: "Kunsthalle, Vienna",
            description: "Spatial Interventions explores how contemporary artists engage with and transform architectural space through site-specific installations. This exhibition features works that respond directly to the physical, historical, and cultural dimensions of the exhibition venue, creating immersive environments that alter visitors' perception and experience of space. Through subtle modifications and bold reconstructions, the exhibited works reveal the contingent nature of our spatial reality.",
            image: "../images/exhibits/ex5.jpg",
            featuredWorks: [
                "Conceptual Installation (2016)",
                "Architectural Inversions (2018)",
                "Spatial Negotiations (2017)",
                "Volume Studies (2019)"
            ]
        }
    ];

    // Elements
    const exhibitionImage = document.getElementById('exhibitionImage');
    const exhibitionTitle = document.getElementById('exhibitionTitle');
    const exhibitionDate = document.getElementById('exhibitionDate');
    const exhibitionLocation = document.getElementById('exhibitionLocation');
    const exhibitionDescription = document.getElementById('exhibitionDescription');
    const exhibitionWorksList = document.getElementById('exhibitionWorksList');
    const exhibitionCounter = document.getElementById('exhibitionCounter');
    const prevButton = document.getElementById('prevExhibition');
    const nextButton = document.getElementById('nextExhibition');

    // Current exhibition index
    let currentExhibitionIndex = 0;

    // Function to display the current exhibition
    function displayExhibition(index) {
        // Add fade transition class
        exhibitionImage.classList.add('fade-transition');
        exhibitionTitle.classList.add('fade-transition');
        exhibitionDate.classList.add('fade-transition');
        exhibitionLocation.classList.add('fade-transition');
        exhibitionDescription.classList.add('fade-transition');
        exhibitionWorksList.classList.add('fade-transition');

        // Wait for transition to complete
        setTimeout(() => {
            const exhibition = exhibitions[index];

            // Update exhibition details
            exhibitionImage.src = exhibition.image;
            exhibitionImage.alt = exhibition.title;
            exhibitionTitle.textContent = exhibition.title;
            exhibitionDate.textContent = exhibition.date;
            exhibitionLocation.textContent = exhibition.location;
            exhibitionDescription.textContent = exhibition.description;

            // Update exhibition counter
            exhibitionCounter.textContent = `${index + 1} / ${exhibitions.length}`;

            // Clear and update works list
            exhibitionWorksList.innerHTML = '';
            exhibition.featuredWorks.forEach(work => {
                const listItem = document.createElement('li');
                listItem.textContent = work;
                exhibitionWorksList.appendChild(listItem);
            });

            // Add fade-in class
            exhibitionImage.classList.add('fade-in');
            exhibitionTitle.classList.add('fade-in');
            exhibitionDate.classList.add('fade-in');
            exhibitionLocation.classList.add('fade-in');
            exhibitionDescription.classList.add('fade-in');
            exhibitionWorksList.classList.add('fade-in');

            // Remove transition classes after fade-in completes
            setTimeout(() => {
                exhibitionImage.classList.remove('fade-transition', 'fade-in');
                exhibitionTitle.classList.remove('fade-transition', 'fade-in');
                exhibitionDate.classList.remove('fade-transition', 'fade-in');
                exhibitionLocation.classList.remove('fade-transition', 'fade-in');
                exhibitionDescription.classList.remove('fade-transition', 'fade-in');
                exhibitionWorksList.classList.remove('fade-transition', 'fade-in');
            }, 500);
        }, 300);
    }

    // Add click event listeners for navigation buttons
    prevButton.addEventListener('click', function() {
        currentExhibitionIndex = (currentExhibitionIndex - 1 + exhibitions.length) % exhibitions.length;
        displayExhibition(currentExhibitionIndex);
    });

    nextButton.addEventListener('click', function() {
        currentExhibitionIndex = (currentExhibitionIndex + 1) % exhibitions.length;
        displayExhibition(currentExhibitionIndex);
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            prevButton.click();
        } else if (event.key === 'ArrowRight') {
            nextButton.click();
        }
    });

    // Initialize the first exhibition
    displayExhibition(currentExhibitionIndex);
});