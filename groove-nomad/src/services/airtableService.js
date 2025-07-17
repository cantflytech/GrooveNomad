const AIRTABLE_BASE_URL = 'https://api.airtable.com/v0/appMDzQcEeOiU2z7y/Festivals';
const AIRTABLE_TOKEN = 'pat335PLmTfpeADKV.3c71e1e75c7e943baa1ff0229a90d85869ad94a12f5458e8a00386de402ffed6';

// Transform Airtable data to our app format
const transformFestivalData = (record) => {
  const fields = record.fields;
  return {
    id: record.id,
    name: fields['Festival Name'],
    description: fields['Festival Summary'] || '',
    location: fields['Location'],
    startDate: fields['Start Date'],
    endDate: fields['End Date'],
    date: formatDateRange(fields['Start Date'], fields['End Date']),
    image: fields['Photo'] && fields['Photo'][0] ? fields['Photo'][0].url : '/placeholder.svg?height=300&width=400',
    ticketAvailability: fields['Ticket Availability'],
    duration: fields['Duration'],
    trending: fields['Label'] === 'Tendance',
    totalParticipants: fields['Total Participants'],
    averageQuotePrice: fields['Average Quote Price'],
    resourceCoordination: fields['Resource Coordination Suggestions']?.value || ''
  };
};

// Format date range for display
const formatDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return '';
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const options = { month: 'short', day: 'numeric' };
  const year = start.getFullYear();
  
  if (start.getTime() === end.getTime()) {
    return `${start.toLocaleDateString('en-US', options)}, ${year}`;
  }
  
  return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}, ${year}`;
};

// Fetch all festivals from Airtable
export const fetchFestivals = async () => {
  try {
    const response = await fetch(AIRTABLE_BASE_URL, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.records.map(transformFestivalData);
  } catch (error) {
    console.error('Error fetching festivals:', error);
    // Return fallback data in case of error
    return getFallbackFestivals();
  }
};

// Fetch a specific festival by ID
export const fetchFestivalById = async (id) => {
  try {
    const response = await fetch(`${AIRTABLE_BASE_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return transformFestivalData(data);
  } catch (error) {
    console.error('Error fetching festival:', error);
    return null;
  }
};

// Fallback data in case API fails
const getFallbackFestivals = () => [
  {
    id: 1,
    name: "Harmony Haven",
    description: "A three-day music festival in the heart of the city, featuring top artists and immersive experiences.",
    date: "Jul 12 - 14, 2024",
    image: "/placeholder.svg?height=300&width=400",
    location: "City Center",
    trending: false
  },
  {
    id: 2,
    name: "Rhythm Retreat",
    description: "Escape to a serene lakeside retreat with acoustic performances and wellness activities.",
    date: "Aug 5 - 7, 2024",
    image: "/placeholder.svg?height=300&width=400",
    location: "Lakeside",
    trending: true
  }
];
