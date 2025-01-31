<template>
    <div>
      <v-container class="py-16">
        <h1 class="text-h1">Team</h1>
        <v-row>
          <v-col v-for="each in data" cols="12" xs="12" sm="6" md="4" lg="3" xl="2">
            <TeamCard :name="each.name" :title="each.title" :image="each.image" :bio="each.bio"></TeamCard>
          </v-col>
        </v-row>
      </v-container>
    </div>
</template>
<script>
import TeamCard from '@/components/TeamCard.vue';

  export default {
    data() {
      return {
        data: [
          {
            name: 'Jennifer Roth',
            title: 'Director',
            image: '',
            bio: '',
          },
          {
            name: 'Lia Petronio',
            title: 'Data Visualization Engineer',
            image: 'lia_petronio.jpg',
            bio: '',
          },
          {
            name: 'Name',
            title: 'Title',
            image: 'Image',
            bio: '',
          },
          {
            name: 'Name',
            title: 'Title',
            image: 'Image',
            bio: '',
          },
          {
            name: 'Name',
            title: 'Title',
            image: 'Image',
            bio: '',
          },
          {
            name: 'Name',
            title: 'Title',
            image: 'Image',
            bio: '',
          },
          {
            name: 'Name',
            title: 'Title',
            image: 'Image',
            bio: '',
          },
          {
            name: 'Name',
            title: 'Title',
            image: 'Image',
            bio: '',
          },

        ]
      }
    },
    mounted() {

      },
      beforeDestroy() {
       
      },

    computed: {
      heroMinHeight () {
        return '100vh'
      },
   
    },
    methods: {
    
    },
    watch: {

    }
  }
</script>