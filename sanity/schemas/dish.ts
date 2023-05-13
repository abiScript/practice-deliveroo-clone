import {StringRule, defineField, defineType} from 'sanity'

export default defineType({
  name: 'dish',
  title: 'Dish',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name of dish',
      type: 'string',
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      name: 'short_description',
      title: 'Short description',
      type: 'string',
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price of the dish in GBP',
      type: 'number',
    }),
    defineField({
      name: 'image',
      title: 'Image of the dish',
      type: 'image',
    }),
  ],
})
