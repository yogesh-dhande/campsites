<template>
  <card class="bg-gray-900 text-lg">
    <div class="flex justify-between items-center">
      <div class="mx-2">
        <h2>{{ toTitleCase(loop) }}: Site {{ site }}</h2>
      </div>
      <a
        class="
          block
          bg-indigo-600
          px-2
          py-1
          mx-2
          shadow
          rounded
          hover:bg-indigo-700
        "
        :href="`https://www.recreation.gov/camping/campsites/${campsite_id}`"
        target="_blank"
        >View Details</a
      >
    </div>
  </card>
</template>

<script>
import Card from '@/components/Card.vue'

export default {
  name: 'Campsite',
  components: {
    Card,
  },
  data() {
    return {
      availabilities: {
        '2021-08-01': 'Available',
        '2021-08-02': 'Available',
        '2021-08-03': 'Available',
        '2021-08-04': 'Available',
        '2021-08-05': 'Available',
        '2021-08-06': 'Available',
        '2021-08-07': 'Available',
        '2021-08-08': 'Available',
        '2021-08-09': 'Available',
        '2021-08-10': 'Available',
        '2021-08-11': 'Available',
        '2021-08-12': 'Available',
        '2021-08-13': 'Available',
        '2021-08-14': 'Available',
        '2021-08-15': 'Available',
        '2021-08-16': 'Available',
        '2021-08-17': 'Available',
        '2021-08-18': 'Available',
        '2021-08-19': 'Available',
        '2021-08-20': 'Available',
        '2021-08-21': 'Available',
        '2021-08-22': 'Available',
        '2021-08-23': 'Available',
        '2021-08-24': 'Available',
        '2021-08-25': 'Available',
        '2021-08-26': 'Available',
        '2021-08-27': 'Available',
        '2021-08-28': 'Available',
        '2021-08-29': 'Available',
        '2021-08-30': 'Available',
        '2021-08-31': 'Available',
      },
      campsite_id: '104730',
      campsite_reserve_type: 'Site-Specific',
      campsite_type: 'STANDARD NONELECTRIC',
      capacity_rating: 'Single',
      loop: 'ESCONDIDO CAMPGROUND',
      max_num_people: 6,
      min_num_people: 1,
      quantities: {},
      site: '05',
      type_of_use: 'Overnight',
      details: {
        CampsiteID: '104730',
        FacilityID: '273869',
        CampsiteName: '05',
        CampsiteType: 'STANDARD NONELECTRIC',
        TypeOfUse: 'Overnight',
        Loop: 'ESCONDIDO CAMPGROUND',
        CampsiteAccessible: false,
        CampsiteLongitude: 0,
        CampsiteLatitude: 0,
        CreatedDate: '2018-03-29',
        LastUpdatedDate: '2020-10-15',
        ATTRIBUTES: [
          { AttributeName: 'Picnic Table', AttributeValue: 'Y' },
          { AttributeName: 'Checkout Time', AttributeValue: '12:00 PM' },
          { AttributeName: 'Site Rating', AttributeValue: 'Standard' },
          { AttributeName: 'Checkin Time', AttributeValue: '3:00 PM' },
          { AttributeName: 'Hike In Distance to Site', AttributeValue: '0' },
          { AttributeName: 'Shade', AttributeValue: 'Full' },
          { AttributeName: 'BBQ', AttributeValue: 'Y' },
          { AttributeName: 'Placed on Map', AttributeValue: '1' },
          { AttributeName: 'Fire Pit', AttributeValue: 'Y' },
          { AttributeName: 'Grills/Fire Ring', AttributeValue: 'Y' },
          { AttributeName: 'Campfire Allowed', AttributeValue: 'Yes' },
          { AttributeName: 'Max Num of People', AttributeValue: '6' },
          { AttributeName: 'Site Access', AttributeValue: 'Drive-In' },
          { AttributeName: 'Capacity/Size Rating', AttributeValue: 'Single' },
          { AttributeName: 'Min Num of People', AttributeValue: '1' },
          { AttributeName: 'Pets Allowed', AttributeValue: 'Yes' },
          { AttributeName: 'Driveway Entry', AttributeValue: 'Back-In' },
          { AttributeName: 'Max Vehicle Length', AttributeValue: '32' },
          { AttributeName: 'Max Num of Vehicles', AttributeValue: '1' },
          { AttributeName: 'Min Num of Vehicles', AttributeValue: '0' },
          { AttributeName: 'IS EQUIPMENT MANDATORY', AttributeValue: 'true' },
          { AttributeName: 'Driveway Surface', AttributeValue: 'Gravel' },
          {
            AttributeName: 'Site Height/Overhead Clearance',
            AttributeValue: '14',
          },
          { AttributeName: 'Driveway Grade', AttributeValue: 'Moderate' },
          { AttributeName: 'Driveway Length', AttributeValue: '32' },
        ],
        ENTITYMEDIA: [
          {
            EntityMediaID: 'c1c16dca-34d6-47a0-a0a5-e77a294dd0e0',
            MediaType: 'Image',
            EntityID: '104730',
            EntityType: 'Campsite',
            Title: 'Escondido Campground Site 005',
            Subtitle: '',
            Description: ' ',
            EmbedCode: '',
            Height: 525,
            Width: 700,
            URL: 'https://cdn.recreation.gov/public/2019/03/13/00/57/104730_bd9eb49e-3b8b-4c0e-abe3-980429f451af_700.jpg',
            Credits: ' ',
            IsPrimary: false,
            IsPreview: false,
            IsGallery: true,
          },
        ],
        PERMITTEDEQUIPMENT: [
          { EquipmentName: 'Tent', MaxLength: 32 },
          { EquipmentName: 'RV', MaxLength: 32 },
        ],
      },
    }
  },
  methods: {
    toTitleCase(str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      })
    },
  },
}
</script>
