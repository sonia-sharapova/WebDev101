document.addEventListener('DOMContentLoaded', function() {
    // Sample works data with properties as specified
    const works = [
        {
            id: 1,
            name: "~ Sound Waves",
            img: "../images/works/gif1.gif",
            url: "#sound-waves",
            description: "An experimental audio visualization project exploring sound patterns",
            longDescription: "Sound Waves is an experimental project that translates audio frequencies into visual representations. Using digital processing techniques, sound input is analyzed in real-time and transformed into dynamic visual patterns. The project explores the relationship between auditory and visual perception, creating a synesthetic experience that bridges these sensory domains.",
            year: "2018",
            medium: "Interactive Digital Installation",
            dimensions: "Variable dimensions",
            topics: ["Audio", "Visual", "2015-2020"]
        },
        {
            id: 2,
            name: "~ Digital Collage Series",
            img: "../images/works/gif2.gif",
            url: "#digital-collage",
            description: "A series of digital collages examining modern media consumption",
            longDescription: "The Digital Collage Series examines our relationship with media in the digital age. Each piece combines fragments of contemporary visual culture, advertising, and social media imagery to create layered compositions that reflect the overwhelming nature of constant information consumption. The work questions how we process and internalize the barrage of visual stimuli in our daily lives.",
            year: "2019",
            medium: "Digital Collage",
            dimensions: "Various dimensions",
            topics: ["Collage", "Visual", "2015-2020", "Too much"]
        },
        {
            id: 3,
            name: "~ Abstract Composition",
            img: "../images/works/img1.jpg",
            url: "#abstract-composition",
            description: "Mixed media composition exploring texture and form",
            longDescription: "Abstract Composition is part of a series investigating the physical properties of various materials. By combining traditional painting techniques with unconventional materials, this work explores the tension between controlled artistic intention and the unpredictable behavior of the materials. The piece invites viewers to consider the relationship between surface, depth, and physical presence.",
            year: "2014",
            medium: "Mixed media on canvas",
            dimensions: "120 x 90 cm",
            topics: ["Paintings", "Material", "2010-2015"]
        },
        {
            id: 4,
            name: "~ Urban Fragments",
            img: "../images/works/img2.jpg",
            url: "#urban-fragments",
            description: "Photographic exploration of urban decay and renewal",
            longDescription: "Urban Fragments documents transitional spaces in cities undergoing rapid change. The photographic series captures moments where decay and renewal coexist, revealing the complex layers of urban history. Each image frames overlooked details of the built environment, highlighting the ephemeral nature of urban landscapes and the human stories embedded within them.",
            year: "2017",
            medium: "Digital photography, archival pigment prints",
            dimensions: "60 x 40 cm each (series of 12)",
            topics: ["Photo Based", "Environment", "2015-2020"]
        },
        {
            id: 5,
            name: "~ Conceptual Installation",
            img: "../images/works/img3.jpg",
            url: "#conceptual-installation",
            description: "Site-specific installation exploring spatial relationships",
            longDescription: "Conceptual Installation responds directly to the architectural and historical context of its exhibition space. Using minimal materials and precise interventions, the work alters viewers' perception of space and movement. The installation creates a dialogue between the physical structure of the space and the ephemeral experience of moving through it, challenging conventional understandings of spatial relationships.",
            year: "2016",
            medium: "Mixed media site-specific installation",
            dimensions: "Variable dimensions",
            topics: ["Installation", "Sculpture", "2015-2020"]
        }
    ];

    // Keep track of active filters
    let activeFilters = [];

    // Get modal elements
    const modal = document.getElementById('workModal');
    const modalBody = modal.querySelector('.modal-body');
    const closeModal = modal.querySelector('.close-modal');

    // Close modal when clicking the X
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Function to open the modal with work details
    function openWorkModal(work) {
        // Populate modal content
        modalBody.innerHTML = `
            <img src="${work.img}" alt="${work.name}" class="modal-image">
            <div class="modal-details">
                <div class="modal-info">
                    <h2>${work.name}</h2>
                    <p><strong>Year:</strong> ${work.year}</p>
                    <p><strong>Medium:</strong> ${work.medium}</p>
                    <p><strong>Dimensions:</strong> ${work.dimensions}</p>
                    <div class="modal-topics">
                        ${work.topics.map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
                    </div>
                </div>
                <div>
                    <p>${work.longDescription}</p>
                </div>
            </div>
        `;

        // Display the modal
        modal.style.display = 'block';
    }

    // Make navigation items clickable
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
        });
    });

    // Make checkboxes clickable and update filters
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', function() {
            // Get the filter value from the parent element's text
            const filterValue = this.parentElement.textContent.trim();

            // Toggle checkbox appearance
            if (this.style.backgroundColor === 'black') {
                this.style.backgroundColor = '';
                // Remove filter from active filters
                activeFilters = activeFilters.filter(filter => filter !== filterValue);
            } else {
                this.style.backgroundColor = 'black';
                // Add filter to active filters if it's not "All"
                if (filterValue !== 'All') {
                    activeFilters.push(filterValue);
                } else {
                    // If "All" is selected, clear all other filters
                    activeFilters = [];
                    // Uncheck all other checkboxes
                    checkboxes.forEach(cb => {
                        if (cb !== this && cb.parentElement.textContent.trim() !== 'All') {
                            cb.style.backgroundColor = '';
                        }
                    });
                }
            }

            // Filter and update the gallery
            updateGallery();
        });
    });

    // Function to update the gallery based on active filters
    function updateGallery() {
        const galleryContainer = document.querySelector('.image-gallery');
        const contentSection = document.querySelector('.content-section');

        // Clear existing gallery
        galleryContainer.innerHTML = '';

        // Clear existing work items in content section
        const exhibitionItems = contentSection.querySelectorAll('.exhibition-item');
        exhibitionItems.forEach(item => {
            if (!item.classList.contains('section-title')) {
                item.remove();
            }
        });

        // Filter works based on active filters
        let filteredWorks = works;
        if (activeFilters.length > 0) {
            filteredWorks = works.filter(work => {
                return activeFilters.some(filter => work.topics.includes(filter));
            });
        }

        // Update work items in content section
        filteredWorks.forEach(work => {
            const workItem = document.createElement('div');
            workItem.className = 'exhibition-item';
            workItem.innerHTML = `${work.name} - ${work.description}`;
            workItem.dataset.workId = work.id;
            workItem.style.cursor = 'pointer';
            contentSection.appendChild(workItem);

            // Add click event to work items in content section
            workItem.addEventListener('click', function() {
                openWorkModal(work);
            });
        });

        // Update gallery images
        filteredWorks.forEach(work => {
            const galleryImage = document.createElement('div');
            galleryImage.className = 'gallery-image';
            galleryImage.innerHTML = `
                <img src="${work.img}" alt="${work.name}" data-work-id="${work.id}">
                <div class="image-overlay">
                    <h3>${work.name}</h3>
                    <p>${work.description}</p>
                </div>
            `;
            galleryContainer.appendChild(galleryImage);
        });

        // Add click event to new gallery images
        const newGalleryImages = document.querySelectorAll('.gallery-image img');
        newGalleryImages.forEach(img => {
            img.addEventListener('click', function() {
                const workId = parseInt(this.dataset.workId);
                const work = works.find(w => w.id === workId);
                if (work) {
                    openWorkModal(work);
                }
            });
        });

        // Add click event to the image overlays as well
        const imageOverlays = document.querySelectorAll('.image-overlay');
        imageOverlays.forEach(overlay => {
            overlay.addEventListener('click', function() {
                const workId = parseInt(this.previousElementSibling.dataset.workId);
                const work = works.find(w => w.id === workId);
                if (work) {
                    openWorkModal(work);
                }
            });
        });
    }

    // Initial gallery setup
    updateGallery();
});