import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().minLength(3).maxLength(255),
    avatar: vine.file().optional(),
    email: vine.string().email(),
    password: vine.string().minLength(6).maxLength(255),
  })
)
