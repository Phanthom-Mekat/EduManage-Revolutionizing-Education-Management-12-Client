const PartnersSection = () => {
    const partners = [
      {
        logo: 'https://i.postimg.cc/2SmVrPg6/google-for-education-logo.webp',
        name: 'Google for Education',
        description: 'Providing cloud-based learning tools and infrastructure to enhance virtual classroom experiences'
      },
      {
        logo: 'https://i.postimg.cc/jSZdKCzg/qzpmwx-C7-400x400.jpg',
        name: 'Microsoft Education',
        description: 'Collaborating on digital skills development and Office 365 integration for seamless coursework management'
      },
      {
        logo: 'https://i.postimg.cc/J05Cqdx6/Thumbnail-508fa1.webp',
        name: 'Coursera',
        description: 'Co-developing specialized certification programs recognized by top universities and companies'
      },
      {
        logo: 'https://i.postimg.cc/4xdR6P9P/logo-IBM-Skills-Build.jpg',
        name: 'IBM SkillsBuild',
        description: 'Offering AI and cloud computing curriculum with hands-on industry projects'
      },
      {
        logo: 'https://i.postimg.cc/4yZrmQGz/images.png',
        name: 'TED-Ed',
        description: 'Curating inspirational educational content and masterclasses from world-renowned experts'
      },
      {
        logo: 'https://i.postimg.cc/nVYyNgKT/linkedin-learning-logo-clipart-rz5ja.jpg',
        name: 'LinkedIn Learning',
        description: 'Providing career development pathways and industry-recognized skill assessments'
      }
    ];
  
    return (
      <section className=" ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 ">
              Our Strategic Partners
            </h2>
            <p className="text-gray-600  max-w-2xl mx-auto">
              Collaborating with global leaders to deliver world-class educational experiences and 
              industry-relevant learning opportunities
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="bg-white  rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={partner.logo}
                    alt={partner.name}
                    className="h-16 w-16 object-contain mr-4 filter grayscale hover:grayscale-0 transition-all"
                  />
                  <h3 className="text-xl font-semibold ">{partner.name}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>
  
          {/* Trust Badge */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center bg-white  px-6 py-3 rounded-full shadow-md">
              <span className="text-sm text-gray-500  mr-2">
                Trusted by educational institutions worldwide
              </span>
              <div className="flex space-x-2">
                <span className="text-primary text-xl">🏫</span>
                <span className="text-primary text-xl">🌍</span>
                <span className="text-primary text-xl">🎓</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  export default PartnersSection;   