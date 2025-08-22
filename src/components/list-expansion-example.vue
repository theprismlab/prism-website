    <template>
    <v-list density="compact">
      <v-list-item title="Dashboard" prepend-icon="mdi-view-dashboard"></v-list-item>

      <v-list-group value="Users">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            title="Users"
            prepend-icon="mdi-account-group"
          ></v-list-item>
        </template>

        <v-list-item title="Profile" prepend-icon="mdi-account"></v-list-item>
        <v-list-item title="Settings" prepend-icon="mdi-cog"></v-list-item>
      </v-list-group>

      <v-list-item title="Reports" prepend-icon="mdi-chart-bar"></v-list-item>
    </v-list>
    </template>
