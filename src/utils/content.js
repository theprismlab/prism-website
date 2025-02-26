


const genomic_characterization_card =  {
    title: 'Genomic and functional characterization',
    subtitle: 'Over 150k genomic features and dependencies for hematopoietic and solid tumor cell lines covering 80 subtypes.',
    image: '2025 PRISM-website-graphics-about-01.png',
    action: {
      text: 'Learn more',
      url: '/screening/cell-line-collection'
    }
  }
  const multiple_screening_offerings_card =  {
    title: 'Multiple screening offerings',
    subtitle: 'Small molecules, combinations, antibody-drug conjugates, antibodies, and cytokines at multiple time points.',
    image: '2025 PRISM-website-graphics-about-02.png',
    action: {
      text: 'Learn more',
        url: '/screening/assays'
    }
    }
    const predictive_modeling_card =  {
        title: 'Predictive modeling to identify patient population and targets',
        subtitle: 'Univariate and multivariate predictive models to compare the viability profile of your drug.',
        image: '2025 PRISM-website-graphics-about-03.png',
        action: {
          text: 'Learn more',
          url: '/screening/data'
        }
      }
      const secure_data_portal_card =  {
        title: 'Secure data portal',
        subtitle: 'Securely browse and discover insights from your screening results with interactive visualizations.',
        image: `2025 PRISM-website-graphics-about-04.png`,
        action: {
          text: 'Learn more',
          url: 'theprismlab.org/portal'
        }
      }



export const what_is_prism_cards =  () => {
    return [
        genomic_characterization_card,
        multiple_screening_offerings_card,
        predictive_modeling_card,

    ]
}


export const prism_impact_cards = () => {
    return [
        {
            value: "150+",
            caption: "Academic and industry partners"
        },
        {
            value: "7,000+",
            caption: "Collaborator compounds screened"
        },
        {
            value: "40+",
            caption: "Publications in high-impact journals"
        }
    ]

}

export const testimonial_cards = () => {
    return [
        {
            text: "I would encourage anyone in the oncology drug development space to take advantage of... the seamless integration of the generated drug-sensitivity data (900+ cell lines) with the Broad’s DepMap multi-omic annotation.",
            name: "Florian Muller",
            title: "Head of Chemistry",
            company: "Lindonlight Collective"
        },
        {
            text: "The true value of PRISM lies in its ability to generate high-throughput data incredibly cost-effectively. The user-friendly, auto-generated reports with built-in analytics supply invaluable insights, streamlining our research process.",
            name: "Discovery Oncology Scientist",
            title: "Fortune 500",
            company: "Pharmaceutical Company"
        }
        
    ]
}