import models from './models'

async function createUsers ()  {
    await models.User.create(
      {
        username: 'potatatatoes',
        messages: [
          {
            text: 'Published the Road to learn React',
          },
        ],
      },
      {
        include: [models.Message],
      },
    );
  
    await models.User.create(
      {
        username: 'banananas',
        messages: [
          {
            text: 'Happy to release ...',
          },
          {
            text: 'Published a complete ...',
          },
        ],
      },
      {
        include: [models.Message],
      },
    );

    await models.User.create(
        {
          username: 'banananas',
          messages: [
            {
              text: 'Happy to release ...',
            },
            {
              text: 'Published a complete ...',
            },
          ],
        },
        {
          include: [models.Message],
        },
      );

      await models.User.create(
        {
          username: 'kurec',
          messages: [
            {
              text: 'Happy to release ...',
            },
            {
              text: 'Published a complete ...',
            },
          ],
        },
        {
          include: [models.Message],
        },
      );

      await models.User.create(
        {
          username: 'oshte kurci',
          messages: [
            {
              text: 'Happy to release ...',
            },
            {
              text: 'Published a complete ...',
            },
          ],
        },
        {
          include: [models.Message],
        },
      );
  };

  export default {
    createUsers
  }
