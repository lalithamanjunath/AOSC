// Base44 API Client
// This is a mock client for now - replace with actual Base44 SDK when available

class Base44Client {
  constructor() {
    // internal list used to mock projects; we expose it with list/create
    const now = () => Date.now().toString();
    this._projects = [
      {
        id: now(),
        title: 'FastShare',
        description: 'A fast and secure file-sharing system built with the QUIC protocol.Which this system ensures better performance, enhanced security, and a reliable file-sharing experience.',
        tech_stack: ['Rust', 'P2P', 'Node.js'],
        category: 'community',
        status: 'active',
        github_url: 'https://github.com/AOSC-Alva-s-Open-Source-Community/Fastshare.git',
        // live_url: 'https://awesome-widget.example.com',
        image_url: 'https://unsplash.com/photos/a-pile-of-floppy-disks-sitting-on-top-of-each-other-yqN6cFNtx30',
        // contributors: [
        //   { name: 'Jane Doe', avatar: 'https://i.pravatar.cc/150?img=47' },
        // ],
      },
    ];

    this.entities = {
      Project: {
        list: async (order = '') => {
          // simply return a copy so callers can't mutate internal array
          return [...this._projects];
        },
        create: async (project) => {
          const newProject = { id: now(), ...project };
          this._projects.unshift(newProject);
          return newProject;
        },
      },
      Event: {
        list: async (order = '') => {
          // Mock data - replace with actual API call
          return [];
        },
      },
      TeamMember: {
        list: async (order = '') => {
          // Mock data - replace with actual API call
          return [];
        },
      },
      Community: {
        list: async (order = '') => {
          // Mock data - replace with actual API call
          return [];
        },
      },
    };
  }
}

export const base44 = new Base44Client();
