export function consoleTable(data: Record<string, any>) {
  console.table(
    Object.entries(data).reduce(
      (ac, [key, value]) => ({
        ...ac,
        [key]: JSON.stringify(value),
      }),
      {}
    )
  );
}
