export type BaseRecord<TEntity, TKey> = TEntity & {
	id: TKey
	createdAt: Date
	updatedAt: Date
}
