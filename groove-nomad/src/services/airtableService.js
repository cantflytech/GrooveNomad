const AIRTABLE_API_URL = 'https://api.airtable.com/v0';
const BASE_ID = 'appMDzQcEeOiU2z7y';
const API_KEY = 'pat335PLmTfpeADKV.3c71e1e75c7e943baa1ff0229a90d85869ad94a12f5458e8a00386de402ffed6';

// Helper: format date range
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

// Transform Airtable festival record to app format
export const transformFestivalData = (record) => {
  const fields = record.fields;
  return {
    id: record.id,
    name: fields['Festival Name'] || '',
    description: fields['Festival Summary'] || '',
    location: fields['Location'] || '',
    startDate: fields['Start Date'],
    endDate: fields['End Date'],
    date: formatDateRange(fields['Start Date'], fields['End Date']),
    image: fields['Photo']?.[0]?.url || '/placeholder.svg?height=300&width=400',
    ticketAvailability: fields['Ticket Availability'] || 0,
    duration: fields['Duration'] || 0,
    trending: fields['Label'] === 'Tendance',
    totalParticipants: fields['Total Participants'] || 0,
    averageQuotePrice: fields['Average Quote Price'] || 0,
    resourceCoordination: fields['Resource Coordination Suggestions']?.value || '',
  };
};

// Common fetch wrapper
async function airtableFetch(tableName) {
  const url = `${AIRTABLE_API_URL}/${BASE_ID}/${encodeURIComponent(tableName)}`;
  const response = await fetch(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
  if (!response.ok) throw new Error(`HTTP ${response.status} -- Could not fetch ${tableName}`);
  const data = await response.json();
  return data.records;
}

// Fetch festivals
export async function fetchFestivals() {
  try {
    const records = await airtableFetch('Festivals');
    return records.map(transformFestivalData);
  } catch (error) {
    console.error('Error fetching festivals:', error);
    return [];
  }
}

// Fetch single festival
export async function fetchFestivalById(id) {
  try {
    const url = `${AIRTABLE_API_URL}/${BASE_ID}/Festivals/${id}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
    if (!res.ok) throw new Error(`HTTP ${res.status} -- Could not fetch Festival ${id}`);
    const data = await res.json();
    return transformFestivalData(data);
  } catch (error) {
    console.error('Error fetching festival by ID:', error);
    return null;
  }
}

// Fetch hotels
export async function fetchHotels() {
  try {
    const records = await airtableFetch('Hotels');
    return records.map(record => ({
      id: record.id,
      name: record.fields['Hotel Name'] || '',
      location: record.fields['Location'] || '',
      roomTypes: record.fields['Room Types'] || [],
      pricePerNight: record.fields['Price Per Night'] || 0,
      availability: record.fields['Availability'] || 0,
      image: record.fields['Photos']?.[0]?.url || '/placeholder.svg?height=200&width=300',
      contact: record.fields['Contact Information'] || '',
      festivalAssociations: record.fields['Festival Association'] || [],
      transportOptions: record.fields['Transport Options'] || []
    }));
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return [];
  }
}

// Fetch activities
export async function fetchActivities() {
  try {
    const records = await airtableFetch('Activities');
    return records.map(record => ({
      id: record.id,
      name: record.fields['Activity Name'] || '',
      description: record.fields['Description'] || '',
      festival: record.fields['Festival'] || [],
      hotel: record.fields['Hotel'] || [],
      transportOption: record.fields['Transport Option'] || [],
      participants: record.fields['Registered Participants'] || [],
      totalParticipants: record.fields['Total Registered Participants'] || 0,
      duration: record.fields['Duration'] || 0,
      quotePrice: record.fields['Total Quote Price']?.[0] || 0
    }));
  } catch (error) {
    console.error('Error fetching activities:', error);
    return [];
  }
}

// Fetch transport options
export async function fetchTransportOptions() {
  try {
    const records = await airtableFetch('Transport Options');
    return records.map(record => ({
      id: record.id,
      type: record.fields['Transport Type'] || '',
      schedule: record.fields['Schedule'] || '',
      price: record.fields['Price'] || 0,
      availability: record.fields['Availability'] || false,
      bookingLink: record.fields['Booking Link'] || '',
      image: record.fields['Photos']?.[0]?.url || '/placeholder.svg?height=200&width=300',
      relatedFestivals: record.fields['Related Festivals'] || []
    }));
  } catch (error) {
    console.error('Error fetching transport options:', error);
    return [];
  }
}

// Fetch hotels by festival
export async function fetchHotelsByFestival(festivalId) {
  try {
    const hotels = await fetchHotels();
    return hotels.filter(hotel => hotel.festivalAssociations.includes(festivalId));
  } catch (error) {
    console.error('Error fetching hotels by festival:', error);
    return [];
  }
}

// Fetch transport by festival
export async function fetchTransportByFestival(festivalId) {
  try {
    const transports = await fetchTransportOptions();
    return transports.filter(tr => tr.relatedFestivals.includes(festivalId));
  } catch (error) {
    console.error('Error fetching transport by festival:', error);
    return [];
  }
}
